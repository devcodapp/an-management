
export class FieldViewModel {
  static toHTTP<E>(object: E, fields: string[]) {
    const data = {} as any

    for (const field of fields) {
      if (field.includes('.')) {
        const [name] = field.split('.')
        if (field[name]) return;
        const relation = this.getRelations(name, fields, object)
        data[name] = relation
      } else {
        data[field] = object[field]
      }
    }

    return data
  }

  static getRelations(name: string, fields: string[], object: any) {
    const relationFields = fields.filter(field => field.startsWith(`${name}.`))

    const relatedEntity = object[name];

    if (!relatedEntity) {
      return undefined;
    }

    return Array.isArray(relatedEntity)
      ? relatedEntity.map(entity => this.extractFields(relationFields, entity))
      : this.extractFields(relationFields, relatedEntity)

  }

  static extractFields(fields: string[], entity: any) {
    return fields.reduce((data, relationField) => {
      const [_, field] = relationField.split('.');
      data[field] = entity[field]
      return data;
    }, {} as any)
  }
}

