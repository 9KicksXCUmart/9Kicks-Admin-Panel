import HomeIcon from './icons/HomeIcon.svelte';
import TasksIcon from './icons/TasksIcon.svelte';
import ReportsIcon from './icons/ReportsIcon.svelte';
import SettingsIcon from './icons/SettingsIcon.svelte';
import CalendarIcon from './icons/CalendarIcon.svelte';
import ProjectsIcon from './icons/ProjectsIcon.svelte';
import TimeManageIcon from './icons/TimeManage.svelte';
import DocumentationIcon from './icons/DocumentationIcon.svelte';

export const data = [
	{
		section: 'Section 1',
		content: [
			{
				title: 'Dashboard',
				icon: HomeIcon,
				link: '/'
			},
			{
				title: 'User Management',
				icon: ProjectsIcon,
				link: '/admin/user'
			},
			{
				title: 'Product Management',
				icon: TasksIcon,
				link: '/admin/product1'
			}
		]
	}
];
