import { GetManyRoles } from "@modules/role/use-cases/get-many-roles";
import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ROLES_KEY } from "src/decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService, private getManyRoles: GetManyRoles) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRole = this.reflector.getAllAndOverride<string>(ROLES_KEY, [context.getHandler(), context.getClass()])

    if (!requiredRole) {
      return true;
    }

    const [name, value] = requiredRole.split(':')

    const token = context.getArgs()[0]['headers']['authorization'].split(' ')[1]

    const decodedToken = this.jwtService.verify(token)

    const { roles } = await this.getManyRoles.execute({ roleIds: decodedToken['roles'] })

    const role = roles.find(role => role.permissions.find((permission) => permission.name === name && permission.values.includes(value)))

    if(!role) throw new HttpException('Sem permissão para realizar esta ação', HttpStatus.FORBIDDEN);

    return true
  }
}