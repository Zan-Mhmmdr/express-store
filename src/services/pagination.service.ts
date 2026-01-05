interface PaginationParams {
  page?: number;
  limit?: number;
}

interface PaginationResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    totalData: number;
    totalPages: number;
  };
}

export const paginate = <T>(
  items: T[],
  params: PaginationParams
): PaginationResult<T> => {
  const page = params.page && params.page > 0 ? params.page : 1;
  const limit = params.limit && params.limit > 0 ? params.limit : 10;

  const totalData = items.length;
  const totalPages = Math.ceil(totalData / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: items.slice(start, end),
    meta: {
      page,
      limit,
      totalData,
      totalPages,
    },
  };
};
