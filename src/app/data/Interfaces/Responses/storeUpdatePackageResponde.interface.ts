interface PackageAttributes {
    name: string;
    description: string;
    max_users: number;
    interval: string;
    interval_count: number;
    price: number;
    trial_days: number;
    active: boolean;
    created_by: string;
    created_at: string;
    updated_at: string;
}

interface PackageData {
    type: string;
    id: string;
    attributes: PackageAttributes;
}

export interface StoreUpdatePackageResponseInterface {
    data: PackageData;
}
