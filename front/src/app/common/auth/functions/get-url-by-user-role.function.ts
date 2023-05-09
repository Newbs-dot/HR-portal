export function getUrlByUserRole(role: string): string {
    if (role === 'DepartmentsHead') {
        return 'head';
    }
    if (role === 'Admin') {
        return 'admin';
    }
    if (role === 'User') {
        return '';
    }
    throw Error('invalid user role');
}