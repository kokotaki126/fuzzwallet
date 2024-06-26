import { AptosConfig } from '../api/aptosConfig.mjs';
import { AptosResponse } from './types.mjs';
import { ClientRequest, Client, ClientResponse, AptosRequest } from '../types/index.mjs';
import '../utils/apiEndpoints.mjs';
import '../utils/const.mjs';
import '../types/indexer.mjs';
import '../types/generated/operations.mjs';
import '../types/generated/types.mjs';

/**
 * Given a url and method, sends the request with axios and
 * returns the response.
 */
declare function request<Req, Res>(options: ClientRequest<Req>, client: Client): Promise<ClientResponse<Res>>;
/**
 * The main function to use when doing an API request.
 *
 * @param options AptosRequest
 * @param aptosConfig The config information for the SDK client instance
 * @returns the response or AptosApiError
 */
declare function aptosRequest<Req extends {}, Res extends {}>(options: AptosRequest, aptosConfig: AptosConfig): Promise<AptosResponse<Req, Res>>;

export { aptosRequest, request };
