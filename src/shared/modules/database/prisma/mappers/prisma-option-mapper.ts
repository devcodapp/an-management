import { Option } from '@modules/option/entities/option';
import { SubOption } from '@modules/suboption/entities/subOption';
import { Option as RawOption } from '@prisma/client';

export class PrismaOptionMapper {
  static toPrisma(option: Option) {
    const suboptions: any = [];
    option.suboptions?.map((item) => {
      const object = {
        name: item.name,
        price: item.price,
        imageId: item.imageId,
        imageUrl: item.imageUrl,
        disabledAt: item.disabledAt,
      };
      suboptions.push(object);
    });
    return {
      id: option.id,
      name: option.name,
      suboptions,
      description: option.description,
      defaultPrice: option.defaultPrice,
      companyId: option.companyId,
      createdAt: option.createdAt,
      createdUser: option.createdUser,
      deletedAt: option.deletedAt,
      deletedUser: option.deletedUser,
    };
  }

  static toDomain(raw: RawOption) {
    const suboptions = [] as SubOption[];
    if (raw.suboptions) {
      raw.suboptions.map((item) => {
        if (typeof item === 'object' && item !== null && !Array.isArray(item)) {
          const sub = new SubOption({
            imageId: item.imageId?.toString() ?? '',
            imageUrl: item.imageUrl?.toString() ?? '',
            name: item.name?.toString() ?? '',
            price: Number(item.price),
            disabledAt: item.disabledAt
              ? new Date(item.disabledAt?.toLocaleString())
              : undefined,
          });
          suboptions.push(sub);
        }
      });
    }
    return new Option(
      {
        companyId: raw.companyId,
        name: raw.name,
        defaultPrice: raw.defaultPrice ?? undefined,
        description: raw.description,
        suboptions: suboptions,
      },
      {
        createdAt: raw.createdAt,
        createdUser: raw.createdUser,
        deletedAt: raw.deletedAt,
        deletedUser: raw.deletedUser,
        id: raw.id,
      },
    );
  }
}
