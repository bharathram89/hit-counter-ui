
export class RegisterVO {
  public constructor(
    public userType:string,
    public firstName:string,
    public lastName:string,
    public password:string,
    public personalEmail:string,
    public companyEmail:string,
    public phoneNumber: string
  ) {}
}
