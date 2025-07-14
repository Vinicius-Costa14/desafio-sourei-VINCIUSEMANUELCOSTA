export class ApiKey {
    constructor(
      public id: string,
      public key: string,
      public createdAt: Date,
      public owner?: string,
      public active: boolean = true
    ) {}
  }