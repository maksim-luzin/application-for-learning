import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { TStore } from '../store';

const useTypedSelector: TypedUseSelectorHook<TStore> = useSelector;

export { useTypedSelector };
