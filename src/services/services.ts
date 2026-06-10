import axios from "axios";
import type {
	AxiosInstance,
	AxiosResponse,
	InternalAxiosRequestConfig,
} from "axios";
import type {
	DeleteParams,
	GetParams,
	PatchParams,
	PostParams,
	PutParams,
} from "@/types/apiTypes";

export const baseURL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/`;

const apiClient: AxiosInstance = axios.create({
	baseURL,
	timeout: 30000,
	headers: {
		"Content-Type": "application/json",
	},
});

apiClient.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		if (typeof window !== "undefined") {
			const raw = localStorage.getItem("user-storage");
			if (raw) {
				const parsed = JSON.parse(raw);
				const token = parsed?.state?.accessToken;
				if (token && typeof token === "string") {
					config.headers.Authorization = `Bearer ${token}`;
				}
			}
		}
		return config;
	},
	(error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error) => {
		if (error?.response?.status === 401 && typeof window !== "undefined") {
			try {
				const raw = localStorage.getItem("user-storage");
				if (raw) {
					const parsed = JSON.parse(raw);
					parsed.state.accessToken = undefined;
					parsed.state.refreshToken = undefined;
					localStorage.setItem("user-storage", JSON.stringify(parsed));
				}
			} catch {}
			window.location.replace("/signin");
		}
		return Promise.reject(error);
	},
);

export const getData = async ({ endPoint, headers, params }: GetParams) => {
	const response: AxiosResponse = await apiClient.get(endPoint, { params, headers });
	return response.data;
};

export const postData = async ({ endPoint, data, headers }: PostParams) => {
	const response: AxiosResponse = await apiClient.post(endPoint, data, { headers });
	return response.data;
};

export const postFormData = async ({ endPoint, data }: PostParams) => {
	const response: AxiosResponse = await apiClient.post(endPoint, data, {
		headers: { "Content-Type": undefined },
	});
	return response.data;
};

export const patchData = async ({ endPoint, data, headers }: PatchParams) => {
	const response: AxiosResponse = await apiClient.patch(endPoint, data, { headers });
	return response.data;
};

export const putData = async ({ endPoint, data }: PutParams) => {
	const response: AxiosResponse = await apiClient.put(endPoint, data);
	return response.data;
};

export const putFormData = async ({ endPoint, data }: PutParams) => {
	const response: AxiosResponse = await apiClient.put(endPoint, data, {
		headers: { "Content-Type": undefined },
	});
	return response.data;
};

export const deleteData = async ({ endPoint, data, headers }: DeleteParams) => {
	const response: AxiosResponse = await apiClient.delete(endPoint, { data, headers });
	return response.data;
};
