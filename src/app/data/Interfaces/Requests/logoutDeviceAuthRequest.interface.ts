export interface LogoutDeviceAuthRequestInterface {
	data: DeviceData;
}

export interface DeviceAttributes {
    device_id: string;
}

export interface DeviceData {
    type: string;
    id: string;
    attributes: DeviceAttributes;
}
