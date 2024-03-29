export interface IAPIResponse<T> {
    data: T,
    status: number,
    success: boolean,
    message: string
}