import { BaseEntity, BaseEntityProps } from "@shared/entities/base-entity";

interface AdminProps {
  userId: string;
}

export class Admin extends BaseEntity {
  private props: AdminProps
  
  constructor(props: AdminProps, baseProps: BaseEntityProps){
    super(baseProps)
    this.props = {
      ...props
    }
  }
}