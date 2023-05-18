import { Address } from '@modules/company/entities/address';
import { Company } from '@modules/company/entities/company';
import { Company as RawCompany } from '@prisma/client';

export class PrismaCompanyMapper {
  static toPrisma(company: Company) {
    return {
      id: company.id,
      name: company.name,
      imageUrl: company.imageUrl,
      imageId: company.imageId,
      description: company.description,
      tags: company.tags,
      type: company.type,
      address: {
        city: company.address?.city,
        street: company.address?.street,
        state: company.address?.state,
        zip: company.address?.zip,
        district: company.address?.district,
      },
      isOpened: company.isOpened,
      openAt: company.openAt,
      closeAt: company.closeAt,
      disabledAt: company.disabledAt,
      createdAt: company.createdAt,
      disabled: company.disabled,
    };
  }

  static toDomain(raw: RawCompany) {
    return new Company({
      name: raw.name,
      imageUrl: raw.imageUrl ?? undefined,
      imageId: raw.imageId ?? undefined,
      description: raw.description,
      tags: raw.tags,
      type: raw.type,
      address: raw.address ? new Address(raw.address as any) : undefined,
      isOpened: raw.isOpened,
      openAt: raw.openAt ?? undefined,
      closeAt: raw.closeAt ?? undefined,
      createdAt: raw.createdAt,
      disabledAt: raw.disabledAt ?? undefined,
      id: raw.id,
      disabled: raw.disabled,
    });
  }
}
