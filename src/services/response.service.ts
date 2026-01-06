interface SuccessResponse<T> {
  success: true;
  message?: string;
  data?: T;
  meta?: any;
}

interface ErrorResponse {
  success: false;
  message: string;
}

export const successResponse = <T>(
  data?: T,
  message?: string,
  meta?: any
): SuccessResponse<T> => {
  return {
    success: true,
    message,
    data,
    meta,
  };
};

export const errorResponse = (message: string): ErrorResponse => {
  return {
    success: false,
    message,
  };
};
