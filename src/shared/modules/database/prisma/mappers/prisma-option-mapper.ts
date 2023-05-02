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
    return new Option(
      {
        companyId: raw.companyId,
        name: raw.name,
        defaultPrice: raw.defaultPrice ?? undefined,
        description: raw.description,
        suboptions: raw.suboptions.map((sb: any) => {
          return new SubOption({
            imageId: sb.imageId?.toString() ?? '',
            imageUrl: sb.imageUrl?.toString() ?? '',
            name: sb.name?.toString() ?? '',
            price: Number(sb.price),
            disabledAt: sb.disabledAt
              ? new Date(sb.disabledAt?.toLocaleString())
              : undefined,
          });
        }),
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
