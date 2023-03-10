import { useState, useEffect } from 'react';
import {
  userCustomFieldsStream,
  IUserCustomFieldData,
  IUserCustomFieldInputType,
} from 'services/userCustomFields';

interface Props {
  inputTypes?: IUserCustomFieldInputType[];
}

export default function useUserCustomFields({
  inputTypes,
}: Props | undefined = {}) {
  const [userCustomFields, setUserCustomFields] = useState<
    IUserCustomFieldData[] | undefined | null
  >(undefined);

  useEffect(() => {
    const subscription = userCustomFieldsStream({
      queryParameters: { input_types: inputTypes },
    }).observable.subscribe((userCustomFields) => {
      setUserCustomFields(userCustomFields.data);
    });

    return () => subscription.unsubscribe();
  }, [inputTypes]);

  return userCustomFields;
}
