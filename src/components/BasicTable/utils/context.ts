import { createContext } from 'react';
import { IBasicTableContext } from '../types/table.props';

export const BasicTableContext = createContext<IBasicTableContext>(null);
