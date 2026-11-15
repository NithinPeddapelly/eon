# Eon

A small Git-inspired version control CLI, written in Node.js. Work in progress.

Eon snapshots files into a hidden `.eonPaths` folder and can push those snapshots to an AWS S3 bucket and pull them back. I am building it to learn how version control works underneath.

## Status

| Area | State |
|---|---|
| `create` – initialise a project (`.eonPaths/`) | Working |
| `load <file>` – stage a file | Working |
| `seal <message>` – snapshot staged files with a message and timestamp | Working |
| `rewind <sealID>` – restore files from a snapshot | Working |
| `upload` / `download` – sync snapshots with S3 | Working |
| `start` – Express server with MongoDB connection and Socket.IO | Skeleton only, no API routes yet |
| Mongoose models (User, Project, Issue) | Defined, not yet used by any route |
| Branching, merging, diffs | Not built |
| Authentication | Not built |
| Web frontend | Not built |
| Automated tests | Not built |

## How it maps to Git

| Eon | Git |
|---|---|
| `create` | `git init` |
| `load <file>` | `git add <file>` |
| `seal "<message>"` | `git commit -m "<message>"` |
| `upload` | `git push` |
| `download` | `git pull` |
| `rewind <sealID>` | `git checkout <commit>` |

Each seal is a full copy of the staged files in `.eonPaths/seals/<uuid>/` plus a `seal.json` holding the message and date. There is no delta storage or history graph yet.

## Tech

Node.js, yargs, AWS SDK (S3), Express, Mongoose, Socket.IO, chalk.

## Setup

Requires Node.js 18+, an AWS account with an S3 bucket, and (for `start` only) a MongoDB connection string.

```bash
git clone https://github.com/NithinPeddapelly/eon.git
cd eon/backend
npm install
cp .env.example .env   # then fill in your own values
```

`.env` values:

```
PORT=3000
MONGODB_URI=<your MongoDB connection string>
S3_BUCKET_NAME=<your bucket>
```

AWS credentials are read from the standard AWS environment variables or `~/.aws/credentials`. Never commit `.env`.

## Usage

```bash
node index.js create
node index.js load notes.txt
node index.js seal "first snapshot"
node index.js upload
node index.js rewind <sealID>
```

## Roadmap

1. REST API for users and projects, with authentication
2. Seal history log and diff between seals
3. Branches
4. Web UI
5. Tests
