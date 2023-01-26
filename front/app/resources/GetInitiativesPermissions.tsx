import { IInitiativeAction } from 'services/initiatives';
import { ActionPermission } from 'services/actionTakingRules';
import useInitiativesPermissions, {
  IInitiativeDisabledReason,
} from 'hooks/useInitiativesPermissions';

type children = (
  renderProps: GetInitiativesPermissionsChildProps
) => JSX.Element | null;

interface Props {
  children?: children;
  action: IInitiativeAction;
}

export type GetInitiativesPermissionsChildProps =
  | ActionPermission<IInitiativeDisabledReason>
  | null
  | undefined;

const GetInitiativesPermissions = ({ children }: Props) => {
  const initiativesPermissions = useInitiativesPermissions();
  return (children as children)(initiativesPermissions);
};

export default GetInitiativesPermissions;
