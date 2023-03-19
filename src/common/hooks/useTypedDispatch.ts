import { useDispatch } from 'react-redux';
import { TDispatch } from '../store';

const useTypedDispatch = () => useDispatch<TDispatch>();

export { useTypedDispatch };
