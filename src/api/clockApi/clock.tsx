/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { endpoints } from '../base';
import { getAuthorizationHeader } from '../../utils/commonFunction';

export const create_analog_clock = createAsyncThunk('create_analog_clock', async (payload: any) => {
  try {
    const { data } = await axios.post(endpoints?.clock?.create_analog_clock, payload?.data, {
      headers: getAuthorizationHeader(),
    });
    toast.success('Save Successfully');
    return data;
  } catch (error:any) {
    toast.error(error?.message);
    throw error;
  }
});

export const update_analog_clock = createAsyncThunk('update_analog_clock', async (payload: any) => {
  try {
    const { data } = await axios.put(endpoints?.clock?.update_analog_clock, payload?.data, {
      headers: getAuthorizationHeader(),
    });
    toast.success('Update Successfully');
    return data;
  } catch (error:any) {
    toast.error(error?.message);
    throw error;
  }
});
export const get_analog_clock = createAsyncThunk('get_analog_clock', async () => {
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axios.get(`${endpoints?.clock?.get_analog_clock}`, {
      headers: getAuthorizationHeader(),
    });
    return data;
  } catch (error) {
    throw error;
  }
})

export const delete_analog_clock = createAsyncThunk("delete_analog_clock",async ({ id }: { id: number }, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${endpoints.clock.delete_analog_clock}/${id}`,
        {
          headers: getAuthorizationHeader(),
        }
      );
      toast.success("Deleted successfully!");
      return data;
    } catch (error: any) {
      toast.error("Failed to delete");
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

