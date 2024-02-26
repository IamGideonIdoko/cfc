export interface SuccessResponse<TData> {
  status: 'success';
  data: TData;
}

export interface ErrorResponse {
  status: 'error';
  error: string;
}

export interface FailedResponse {
  message: string;
}

export type ChimoneyResponse<T> = SuccessResponse<T> | ErrorResponse | FailedResponse;

export interface SubAccountDetails {
  id: string;
  parent: string;
  uid: string;
  approved: boolean;
  createdDate: Date;
  meta: object;
  name: string;
  verified: boolean;
  isScrimUser: boolean;
  subAccount: boolean;
  wallets: Wallet[];
}

export interface Wallet {
  id: string;
  owner: string;
  balance: number;
  type: string;
  transactions: Transaction[];
}

export interface Transaction {
  amount: number;
  balanceBefore: number;
  meta: TransactionMeta;
  newBalance: number;
  description: string;
}

export interface TransactionMeta {
  date: DateClass;
}

export interface DateClass {
  _seconds: number;
  _nanoseconds: number;
}

export type GetSubAccountDetailsResponse = ChimoneyResponse<SubAccountDetails>;

export interface Approval {
  changedFields: string[];
  deviceTime: string;
  timestamp: Date;
}

export type CreateSubAccountResponse = ChimoneyResponse<Omit<SubAccountDetails, 'wallets'> & { approval: Approval }>;
