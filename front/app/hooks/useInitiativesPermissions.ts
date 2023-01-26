import { useState, useEffect } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { ActionPermission } from 'services/actionTakingRules';
import { currentAppConfigurationStream } from 'services/appConfiguration';
import { authUserStream } from 'services/auth';
import { combineLatest } from 'rxjs';

export type IInitiativeDisabledReason = 'notPermitted';

export default function useInitiativesPermissions() {
  const [actionPermission, setActionPermission] = useState<
    ActionPermission<IInitiativeDisabledReason> | null | undefined
  >(undefined);

  useEffect(() => {
    const subscription = combineLatest([
      currentAppConfigurationStream().observable,
      authUserStream().observable,
    ]).subscribe(([tenant, authUser]) => {
      if (!isNilOrError(tenant)) {
        if (!isNilOrError(authUser)) {
          setActionPermission({
            show: true,
            enabled: true,
            disabledReason: null,
            action: null,
          });
        } else {
          setActionPermission({
            show: true,
            enabled: 'maybe',
            disabledReason: null,
            action: 'sign_in_up',
          });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return actionPermission;
}
