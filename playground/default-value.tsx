import React, {useState} from 'react';
import {render, Box, Text} from 'ink';
import {Option, ResponsiveSelect} from '../source/index.js';
import {preparePlayground} from '../source/utils.js';
import BigText from 'ink-big-text';

preparePlayground();

const options = [
	{label: 'web-support-gateway0', value: 'web-support-gateway', checked: false},
	{label: 'web-storefront1', value: 'web-storefront', checked: false},
	{label: 'web-social-gateway2', value: 'web-social-gateway', checked: false},
	{label: 'web-sfx3', value: 'web-sfx', checked: false},
	{label: 'web-services4', value: 'web-services', checked: false},
	{label: 'web-search-gateway5', value: 'web-search-gateway', checked: false},
	{label: 'web-reco-gateway6', value: 'web-reco-gateway', checked: false},
	{label: 'web-product-gateway7', value: 'web-product-gateway', checked: false},
	{label: 'web-payment-gateway8', value: 'web-payment-gateway', checked: false},
	{label: 'web-oms-gateway9', value: 'web-oms-gateway', checked: false},
	{
		label: 'web-navigation-gateway10',
		value: 'web-navigation-gateway',
		checked: false,
	},
	{label: 'web-member-gateway11', value: 'web-member-gateway', checked: false},
	{
		label: 'web-marketing-gateway12',
		value: 'web-marketing-gateway',
		checked: false,
	},
	{
		label: 'web-gateway-response13',
		value: 'web-gateway-response',
		checked: false,
	},
	{label: 'web-coupon-gateway14', value: 'web-coupon-gateway', checked: false},
	{label: 'web-configuration15', value: 'web-configuration', checked: false},
	{
		label: 'web-checkout-gateway16',
		value: 'web-checkout-gateway',
		checked: false,
	},
	{
		label: 'web-browsing-gateway17',
		value: 'web-browsing-gateway',
		checked: false,
	},
	{
		label: 'web-account-gateway18',
		value: 'web-account-gateway',
		checked: false,
	},
	{label: 'tym19', value: 'tym', checked: false},
	{label: 'storefront-milla20', value: 'storefront-milla', checked: false},
	{label: 'storefront21', value: 'storefront', checked: false},
	{label: 'social-gateway22', value: 'social-gateway', checked: false},
	{label: 'search-gateway23', value: 'search-gateway', checked: false},
	{
		label: 'recommendation-gateway24',
		value: 'recommendation-gateway',
		checked: false,
	},
	{label: 'product-gateway25', value: 'product-gateway', checked: false},
	{label: 'pathfinder26', value: 'pathfinder', checked: false},
	{label: 'order-gateway27', value: 'order-gateway', checked: false},
	{
		label: 'mweb-marketing-gateway28',
		value: 'mweb-marketing-gateway',
		checked: false,
	},
	{label: 'gateway-renderer29', value: 'gateway-renderer', checked: false},
	{
		label: 'gateway-configuration30',
		value: 'gateway-configuration',
		checked: false,
	},
	{
		label: 'gateway-build-tools31',
		value: 'gateway-build-tools',
		checked: false,
	},
	{
		label: 'feature-branch-router32',
		value: 'feature-branch-router',
		checked: false,
	},
	{
		label: 'collectable-coupon-gateway33',
		value: 'collectable-coupon-gateway',
		checked: false,
	},
	{label: 'checkout-gateway34', value: 'checkout-gateway', checked: false},
	{label: 'cdn-uploader35', value: 'cdn-uploader', checked: false},
	{label: 'cdn-mass-uploader36', value: 'cdn-mass-uploader', checked: false},
	{label: 'browsing-gateway37', value: 'browsing-gateway', checked: false},
	{
		label: 'authentication-gateway38',
		value: 'authentication-gateway',
		checked: false,
	},
	{label: 'account-gateway39', value: 'account-gateway', checked: false},
];

const StaticExample = () => {
	const [checkedOptions, setCheckedOptions] = useState<Option[]>();
	const [lastChanged, setLastChanged] = useState<Option>();

	return (
		<Box flexDirection="column" margin={1} gap={1}>
			<BigText text="Demo: Default Value" font="tiny" colors={['blue']} />
			<ResponsiveSelect
				sortBy="asc"
				column={3}
				options={options}
				onChanged={changedOption => setLastChanged(changedOption)}
				onSubmitted={({selectedOptions}) => setCheckedOptions(selectedOptions)}
			/>
			<Text color="green">
				Checked options: {checkedOptions?.map(o => o.label).join(', ')}
			</Text>
			<Text color="green">
				Last checked: {lastChanged?.label} -{' '}
				{lastChanged ? String(lastChanged?.checked) : ''}
			</Text>
		</Box>
	);
};

render(<StaticExample />);
