
export function Paginated<T>() {
  abstract class PaginatedResponseClass {
    items: any[];

    pagination: PageInfo;
  }
  return PaginatedResponseClass;
}

export class PageInfo {
  perPage: number;

  currentPage: number;

  count: number;

  pagesCount: number;
}

export async function Paginate(count, perPage, currentPage) {
  const pagesCount = Math.ceil(count / perPage);
  return { perPage, currentPage, count, pagesCount };
}