import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

function NavBarCliente(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Navbar style={{ backgroundColor: '#000000' }} dark expand="md">
        <NavbarBrand style={{ userSelect: 'none' }}>
          <img
            src={`${process.env.PUBLIC_URL}/images/logo.png`}
            alt="ViaSvel Logo"
            style={{ height: '30px' }}
          />
        </NavbarBrand>
        <NavbarToggler
          onClick={toggle}
          style={{
            borderColor: 'transparent',
            backgroundColor: '#1DB954',
            color: '#1DB954',
          }}
        />

        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink href="/inicio_cliente">Inicio</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/FranclinAguilar">
                Sobre Nosotros
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Opciones
              </DropdownToggle>
              <DropdownMenu style={{ backgroundColor: '#000000' }} dark expand="md" end>
                <DropdownItem href='/gestionviajes'>MisViajes</DropdownItem>
                <DropdownItem divider />
                <DropdownItem href='/'>cerrar sesión</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default NavBarCliente;
