import { CaskVars } from './caskTypes';
import { InputVarsType } from './inputTypes';
import { SpiritVars } from './spiritsTypes';

export type SpiritCaskVarsType = InputVarsType;

export const SpiritCaskVars: SpiritCaskVarsType[] = [...SpiritVars, ...CaskVars];
