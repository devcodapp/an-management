import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateOwnerBody {
  @IsNotEmpty({message: "O nome não pode ser vazio"})
  @IsString()
  name: string

  @IsNotEmpty({message: "O email não pode ser vazio"})
  @IsEmail({}, {message: "O email precisa ser válido"})
  email: string;

  @IsNotEmpty({message: "A senha não pode ser vazio"})
  @IsString()
  password: string;
}