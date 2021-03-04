import { InputVarsType } from './inputTypes';
import { WhiskyKeyType, WhiskyVars } from './whiskyTypes';
import { CaskKeyType, CaskVars } from './caskTypes';

export type WhiskyCaskVarsType = InputVarsType<WhiskyKeyType | CaskKeyType>;

export const WhiskyCaskVars: WhiskyCaskVarsType[] = [...WhiskyVars, ...CaskVars];
