export function getUrlByUserRole(role: string): string {
    if (role === 'DepartmentsHead') {
        return 'head';
    }
    if (role === 'Administrator') {
        return 'admin';
    }
    if (role === 'User') {
        return '';
    }
    throw Error('invalid user role');
}