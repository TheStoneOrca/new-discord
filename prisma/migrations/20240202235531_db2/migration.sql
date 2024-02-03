-- CreateTable
CREATE TABLE "Users" (
    "userid" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userrole" TEXT NOT NULL,
    "profile" TEXT NOT NULL,
    "email" TEXT[],
    "fname" TEXT NOT NULL,
    "lname" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "pronouns" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Groups" (
    "groupid" SERIAL NOT NULL,
    "groupname" TEXT NOT NULL,
    "grouprules" TEXT NOT NULL,
    "groupprofile" TEXT NOT NULL,
    "groupcreator" TEXT NOT NULL,

    CONSTRAINT "Groups_pkey" PRIMARY KEY ("groupid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_userid_key" ON "Users"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "Groups_groupcreator_key" ON "Groups"("groupcreator");

-- AddForeignKey
ALTER TABLE "Groups" ADD CONSTRAINT "Groups_groupcreator_fkey" FOREIGN KEY ("groupcreator") REFERENCES "Users"("userid") ON DELETE RESTRICT ON UPDATE CASCADE;
