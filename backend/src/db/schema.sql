CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  full_name TEXT,
  college TEXT NOT NULL,
  department TEXT,
  hostel TEXT,
  year_of_study INT,
  age INT CHECK (age >= 18),
  gender TEXT,
  interested_in TEXT,
  bio TEXT CHECK (char_length(bio) <= 150),
  crush_coins INT DEFAULT 0,
  is_verified BOOLEAN DEFAULT FALSE,
  is_banned BOOLEAN DEFAULT FALSE,
  ghost_mode BOOLEAN DEFAULT FALSE,
  ghost_dept BOOLEAN DEFAULT TRUE,
  ghost_hostel BOOLEAN DEFAULT FALSE,
  spotlight_opt_in BOOLEAN DEFAULT TRUE,
  last_active TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT CHECK (char_length(caption) <= 50),
  position INT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reel_intros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  duration_sec INT CHECK (duration_sec <= 30),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL CHECK (char_length(answer) <= 120),
  position INT
);

CREATE TABLE swipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  swiper_id UUID REFERENCES users(id),
  swiped_id UUID REFERENCES users(id),
  direction TEXT CHECK (direction IN ('like','pass','superlike')),
  reacted_to_type TEXT CHECK (reacted_to_type IN ('photo','prompt')),
  reacted_to_id UUID,
  reaction_emoji TEXT,
  reaction_comment TEXT CHECK (char_length(reaction_comment) <= 120),
  reaction_voice_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(swiper_id, swiped_id)
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user1_id UUID REFERENCES users(id),
  user2_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id) DEFAULT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  matched_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id),
  sender_id UUID REFERENCES users(id),
  content TEXT,
  message_type TEXT DEFAULT 'text' CHECK (message_type IN ('text','gif','voice','system')),
  voice_url TEXT,
  voice_transcript TEXT,
  seen BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  college TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  banner_url TEXT,
  event_date TIMESTAMPTZ,
  location TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE event_rsvps (
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, event_id)
);

CREATE TABLE coin_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  delta INT NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE safe_meet_contacts (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  contact_name TEXT NOT NULL,
  contact_phone TEXT NOT NULL
);

CREATE TABLE safe_meet_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  match_id UUID REFERENCES matches(id),
  location TEXT,
  meet_time TIMESTAMPTZ,
  checkin_done BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id UUID REFERENCES users(id),
  reported_id UUID REFERENCES users(id),
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blocks (
  blocker_id UUID REFERENCES users(id),
  blocked_id UUID REFERENCES users(id),
  PRIMARY KEY (blocker_id, blocked_id)
);

-- Indexes
CREATE INDEX idx_swipes_swiper ON swipes(swiper_id);
CREATE INDEX idx_swipes_swiped ON swipes(swiped_id);
CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_messages_match ON messages(match_id, created_at DESC);
CREATE INDEX idx_users_college ON users(college);
CREATE INDEX idx_users_last_active ON users(last_active DESC);
