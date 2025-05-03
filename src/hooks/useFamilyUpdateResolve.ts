import { useDispatch } from "react-redux";
import { resolveFamilyUpdate } from "../utils/familyUpdatesUtils";
import { AppDispatch } from "../store";
import { useState } from "react";
import { fetchFamilyUpdates } from "../store/familyUpdatesSlice";

interface UseFamilyUpdateResolve {
  handleResolve: (id: string, resolved: boolean) => Promise<void>;
}

export const useFamilyUpdateResolve = (): UseFamilyUpdateResolve => {
  const [startDate] = useState<number>(1740787200000); // May 1, 2025
  const [endDate] = useState<number>(1745548800000); // May 2, 2025

  const dispatch = useDispatch<AppDispatch>();

  const handleFetchUpdates = () => {
    const params = {
      status: undefined,
      startDate,
      endDate,
    };
    dispatch(fetchFamilyUpdates(params));
  };

  const handleResolve = async (id: string, resolved: boolean) => {
    await resolveFamilyUpdate(id, resolved);
    handleFetchUpdates();
  };

  return { handleResolve };
};
