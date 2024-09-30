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

function NavBarOficina(args) {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <>
            <Navbar style={{ backgroundColor: '#2D394B' }} dark expand="md">
                <NavbarBrand style={{ userSelect: 'none' }}>
                <img
                    src={`${process.env.PUBLIC_URL}/images/logo.png`}
                    alt="ViaSvel Logo"
                    style={{ height: '30px' }} // Ajusta el tamaño según sea necesario
                />
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        <NavItem>
                            <NavLink href="/inicio_oficina">Inicio</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/gestion_usuarios">
                                Gestionar Usuarios
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Cielito Lindo
                            </DropdownToggle>
                            <DropdownMenu style={{ backgroundColor: '#2D394B' }} dark expand="md" end>
                                <DropdownItem href='/gestion_unidades'>Gestionar Unidades</DropdownItem>
                                <DropdownItem href='/gestion_viajes'>Gestionar Viajes</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href='/'>Cerrar sesión</DropdownItem>
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

export default NavBarOficina;

