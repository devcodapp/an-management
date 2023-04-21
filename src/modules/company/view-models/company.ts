import { Company } from '../entities/company';

export class CompanyViewModel {
  static toHTTP(company: Company) {
    return {
      id: company.id,
      name: company.name,
      description: company.description,
      tags: company.tags,
      type: company.type,
      address: {
        street: company.address?.street,
        city: company.address?.city,
        state: company.address?.state,
        zip: company.address?.zip,
        district: company.address?.district,
      },
      isOpened: company.isOpened,
      openAt: company.openAt,
      closeAt: company.closeAt,
      imageUrl: company.imageUrl,
      disabledAt: company.disabledAt,
    };
  }
}
