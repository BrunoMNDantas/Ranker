import React, { HTMLAttributes } from 'react';
import classes from './Page.module.css';

export interface PageProps extends HTMLAttributes<HTMLDivElement> {
	title: string
}

const Page: React.FC<PageProps> = ({ title, children, ...props }) => {
	const className = props.className ? props.className : classes.root

	return (
		<div className={className} {...props}>
			<div className={classes.title}>
				{title}
			</div>
			<div className={classes.content}>
				{children}
			</div>
		</div>
	);
}

export default Page;