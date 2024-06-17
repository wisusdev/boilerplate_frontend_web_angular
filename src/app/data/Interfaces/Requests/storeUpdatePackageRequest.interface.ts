export interface PackageData {
    type: string;
	id?: string;
    attributes: {
        name: string;
        description: string;
        max_users: number;
        interval: string;
        interval_count: number;
        price: number;
        trial_days: number;
        active: boolean;
        created_by: string;
    }
}

export interface StoreUpdatePackageRequestInterface {
    data: PackageData;
}
