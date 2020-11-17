--ADD UNIQUE USERNAME:   CONSTRAINT unique_username UNIQUE(username)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    role TEXT,
    given_name TEXT,
    family_name TEXT,
    username TEXT,
    password TEXT
);

--UPDATE AFTER CLOSING THE SESSION:   MAKE SURE THAT "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP" CAN BE WRITTEN HERE AT CLOSING
CREATE TABLE conversations (
  conversation_id SERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  closed_at TEXT,
  user_id TEXT,
  admin_id TEXT
);

CREATE TABLE messages (
  conversation_id INT REFERENCES conversations(conversation_id),
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  deleted_at TEXT
);