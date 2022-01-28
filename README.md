# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

- Ruby version

- System dependencies

- Configuration

- Database creation

- Database initialization

- How to run the test suite

- Services (job queues, cache servers, search engines, etc.)

- Deployment instructions

- ...

# Medmory

## Contents

- [General info](#general-info)
- [Sample image](#sample-image)
- [Tech stack](#tech-stack)
- [Set up](#set-up)

## General info

- Application where users notify each other upon medication compliance and track the history

- Available in any device; mobile, tablet, and PC.

- versions: Ruby 2.7.5, Rails 6.1.4.4, Node v16.13.1(M1) || v14.15.0(non-M1), Bundler 2.3.0

## Sample images

mobile views: mypage & mypage(easymode) & popup
![sample1](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/mobile-sample1.png?raw=true)

mobile views: search page & bond page & history
![sample2](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/mobile-sample2.png?raw=true)

web view: mypage
![sample3](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/web-mypage.png?raw=true)

web view: popup
![sample4](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/web-popup.png?raw=true)

web view: bond page
![sample5](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/web-bondpage.png?raw=true)

ERD
![sample6](https://github.com/aaron-s-kim/medmory/blob/master/sample-images/erd.png?raw=true)

## Tech stack

- Front-end: React.js;
- Back-end: Rails
- Web-socket: ActionCable
- Database: PostgreSQL
- APIs: Twilio for text & Recharts for graph

## Set up

To run this project:

1. Create `.env` by using `.env.example`

```bash
cp .env.example .env
```

2. Insert your Twilio information and number in `.env`

```
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_NUMBER=
CONNOR_NUMBER=
JEFF_NUMBER=
AARON_NUMBER=
```

3. Install server dependencies:

```bash
# in root dir
$ bundle install
```

4. Install client dependencies:

```bash
# in root dir
$ cd client
$ npm install
```

5. Run server and client in a separate terminal

```bash
# in root dir
$ rails s # to run server

# move into client dir
$ cd client
$ npm start # to run client
```
