CREATE TABLE users(
  userid TEXT UNIQUE,
  username TEXT,
  userrole TEXT,
  profile TEXT,
  email TEXT[],
  fname TEXT,
  lname TEXT,
  bio TEXT,
  pronouns TEXT
);

CREATE TABLE groups(
  groupid SERIAL PRIMARY KEY,
  groupname TEXT,
  grouprules TEXT,
  groupprofile TEXT,
  groupcreator TEXT REFERENCES users(userid)
);

CREATE TABLE joins(
  joinid SERIAL PRIMARY KEY,
  joininggroup INT REFERENCES groups(groupid),
  joiningperson TEXT REFERENCES users(userid),
  role TEXT
);

CREATE TABLE catergories(
  catergoryid SERIAL PRIMARY KEY,
  catergoryname TEXT,
  catergorygroup INT REFERENCES groups(groupid)
);

CREATE TABLE channels(
	channelid SERIAL PRIMARY KEY,
	channelname TEXT,
	channelcatergory INT REFERENCES catergories(catergoryid),
	channelgroup INT REFERENCES groups(groupid)
);

CREATE TABLE messages(
	messageid SERIAL PRIMARY KEY,
	messagetext TEXT,
	messagesender TEXT REFERENCES users(userid),
	messagesentin INT REFERENCES channels(channelid),
	messagegroup INT REFERENCES groups(groupid)
);

ALTER TABLE catergories ADD COLUMN catergorynumber INT;
ALTER TABLE channels ADD COLUMN channelnumber INT;
ALTER TABLE channels ADD COLUMN channeltype TEXT CHECK (channeltype IN ('voice', 'text'))