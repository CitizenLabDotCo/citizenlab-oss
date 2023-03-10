import { API_PATH } from 'containers/App/constants';
import streams, { IStreamParams } from 'utils/streams';
import { IRelationship, Multiloc } from 'typings';

export interface IUserCustomFieldOptionData {
  id: string;
  type: string;
  attributes: {
    key: string;
    title_multiloc: Multiloc;
    ordering: number;
    created_at: string;
    updated_at: string;
  };
  relationships: {
    custom_field_options: {
      data: IRelationship;
    };
  };
}

export interface IUserCustomFieldOptions {
  data: IUserCustomFieldOptionData[];
}

export interface IUserCustomFieldOption {
  data: IUserCustomFieldOptionData;
}

export function userCustomFieldOptionsStream(
  customFieldId: string,
  streamParams: IStreamParams | null = null
) {
  return streams.get<IUserCustomFieldOptions>({
    apiEndpoint: `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options`,
    ...streamParams,
  });
}

export async function deleteUserCustomFieldOption(
  customFieldId: string,
  optionId: string
) {
  const response = await streams.delete(
    `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options/${optionId}`,
    optionId
  );

  streams.fetchAllWith({
    apiEndpoint: [
      `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options`,
    ],
  });

  return response;
}

export async function reorderUserCustomFieldOption(
  customFieldId: string,
  customFieldOptionId: string,
  params: { ordering: number }
) {
  const response = await streams.update<IUserCustomFieldOption>(
    `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options/${customFieldOptionId}/reorder`,
    customFieldOptionId,
    { custom_field_option: params }
  );

  streams.fetchAllWith({
    apiEndpoint: [
      `${API_PATH}/users/custom_fields/${customFieldId}/custom_field_options`,
    ],
  });

  return response;
}
