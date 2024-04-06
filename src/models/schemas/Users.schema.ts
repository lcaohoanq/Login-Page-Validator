import {Timestamp} from "mongodb";

interface AccountSchema {
  id: number;
  username: string;
  password: string;
  score: number;
  create: Timestamp;
}

type User = Pick<AccountSchema, "username" | "password" | "score">;

class Account {
  constructor(
    private id: number,
    private username: string,
    private password: string,
    private score?: number
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.score = score;
  }

   static createUsernamePassword(username: string, password: string) {
     return new Account(0, username, password, 0);
  }

  static createUsernamePasswordScore(
    username: string,
    password: string,
    score: number
  ) {
    return new Account(0, username, password, score);
  }
}