import { BaseEntity, BaseEntityProps } from "@shared/entities/base-entity";
import { Paginated } from "src/utils/pagination";

export interface Permission {
  name: string;
  values: string[];
}

interface UserRole {
  id: string;
  username: string;
  email: string
}

interface RoleProps {
  name: string;
  description: string;

  numberOfUsers?: number;

  permissions: Permission[]
  restaurantId: string

  users?: UserRole[]
}

export class Role extends BaseEntity {
  private props: RoleProps

  constructor(props: RoleProps, baseProps: BaseEntityProps){
    super(baseProps)
    this.props = {
      ...props,
      name: props.name.toUpperCase(),
      permissions: props.permissions || []
    }
  }

  public get name(): string {
    return this.props.name
  }

  public get description(): string {
    return this.props.description
  }

  public get permissions(): Permission[] {
    return this.props.permissions
  }

  public get restaurantId(): string {
    return this.props.restaurantId
  }

  public get numberOfUsers(): number {
    return this.props.numberOfUsers || 0
  }

  public get users(): UserRole[]{
    return this.props.users || []
  }

  public set name(name: string){
    this.props.name = name
  }

  public set description(description: string){
    this.props.description = description
  }

  public set permissions(permissions: Permission[]) {
    this.props.permissions = permissions
  }
}

export class RolePaginated extends Paginated<Role>(){}