'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconMap } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { Avatar, Box, Button, Flex, Group, Menu, Paper, Skeleton, Text } from '@mantine/core';
import classes from './NavBar.module.css';

const NavBar = () => {
  return (
    <nav>
      <Paper shadow="md">
        <Group justify="space-between" mx="xl">
          <Group>
            <Link href="/">
              <IconMap size={30} />
            </Link>
            <NavLinks />
          </Group>
          <AuthStatus />
        </Group>
      </Paper>
    </nav>
  );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: 'Planner', href: '/planner/new' },
    { label: 'Dashboard', href: '/dashboard' },
  ];

  return (
    <Flex>
      {links.map((link) => (
        <Link
          href={link.href}
          key={link.href}
          className={`${classes.navLink} ${link.href === currentPath ? classes.activeLink : ''}`}
        >
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === 'loading') return <Skeleton width="3rem" />;

  if (status === 'unauthenticated')
    return (
      <Button variant="light">
        <Link className="nav-link" href="/api/auth/signin">
          Log in
        </Link>
      </Button>
    );

  return (
    <Box>
      <Menu>
        <Menu.Target>
          <Avatar src={session!.user?.image!} size="md" radius="xl" className="cursor-pointer" />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>
            <Text size="sm">{session!.user?.email}</Text>
          </Menu.Label>
          <Menu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Box>
  );
};

export default NavBar;
