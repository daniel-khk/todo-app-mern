import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isInputModalOpen: false,
	isEditOpen: false,
	isAddOpen: false,
	modalType: "",
	inputText: "",
	todoId: "",
	isDeleteOpen: false,
	isLoading: true
}

const inputModalSlice = createSlice({
	name: 'input',
	initialState,
	reducers: {
		openModal(state, action) {
			state.isInputModalOpen = true;
			document.body.style.overflow = "hidden";
		},
		closeModal(state, action) {
			state.isInputModalOpen = false;
			document.body.style.overflow = "unset";
		},
		setModalType(state, action) {
			state.modalType = action.payload;
		},
		setInputText(state, action) {
			state.inputText = action.payload;
		},
		setTodoId(state, action) {
			state.todoId = action.payload;
		},
		openDelete(state, action) {
			state.isDeleteOpen = true;
			document.body.style.overflow = "hidden";
		},
		closeDelete(state, action) {
			state.isDeleteOpen = false;
			document.body.style.overflow = "unset";
		},
	}
});

export const {
	openModal, closeModal, setModalType, setInputText, setTodoId, openDelete, closeDelete
} = inputModalSlice.actions;

export default inputModalSlice.reducer;