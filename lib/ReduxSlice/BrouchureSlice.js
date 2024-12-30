import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Brouchurecalculation } from "../API/Brochure";

export const GetBrouchurecalculation = createAsyncThunk(
  "category/GetBrouchurecalculation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await Brouchurecalculation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const brochureSlice = createSlice({
  name: "brochure",
  initialState: {
    brochureresult: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetBrouchurecalculation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetBrouchurecalculation.fulfilled, (state, action) => {
        state.loading = false;
        state.brochureresult = action.payload;
      })
      .addCase(GetBrouchurecalculation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brochureSlice.reducer;

//  <Modal
//       isOpen={isOpen}
//       onOpenChange={onOpenChange}
//       isDismissable={false}
//       isKeyboardDismissDisabled={true}
//     >
//       <ModalContent>
//         {(onClose) => (
//           <>
//             <ModalHeader className="flex flex-col gap-1">
//               Select Design
//             </ModalHeader>
//             <ModalBody>
//               <div className="flex gap-4 justify-center h-14 items-center">
//                 <div className="group relative h-24  border border-slate flex justify-center items-center p-2 ">
//                   <Image
//                     src={PaperPrintings}
//                     className=" object-cover cursor-pointer transition-transform transform group-hover:scale-110"
//                     alt="Paper Printings"
//                   />
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
//                 </div>
//                 <div className="group relative h-24  border border-slate flex justify-center items-center p-2 ">
//                   <Image
//                     src={PaperBag}
//                     className="cursor-pointer transition-transform transform group-hover:scale-110"
//                     alt="Paper Bag"
//                   />
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
//                 </div>
//                 <div className="group relative h-24  border border-slate flex justify-center items-center p-2">
//                   <Image
//                     src={PhotoAlbum}
//                     className="cursor-pointer transition-transform transform group-hover:scale-110"
//                     alt="Photo Album"
//                   />
//                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity"></div>
//                 </div>
//               </div>

//               <div className="card">
//                 <FileUpload
//                   name="demo[]"
//                   url={"/api/upload"}
//                   multiple
//                   accept="image/*"
//                   maxFileSize={1000000}
//                   emptyTemplate={
//                     <p className="m-0">
//                       Drag and drop files to here to upload.
//                     </p>
//                   }
//                 />
//               </div>
//             </ModalBody>
//             <ModalFooter>
//               <Button color="danger" variant="light" onPress={onClose}>
//                 Close
//               </Button>
//               <Button color="primary" onPress={onClose}>
//                 Select
//               </Button>
//             </ModalFooter>
//           </>
//         )}
//       </ModalContent>
//     </Modal>
