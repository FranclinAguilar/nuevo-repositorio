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
} from 'reactstrap';
import './navBar.css'
function NavBarOficina(args) {
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
                            <NavLink href="/inicio_oficina" className="nav-link-hover">
                                Inicio
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/gestion_usuarios" className="nav-link-hover">
                                Gestionar Usuarios
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Ver Destinos
                            </DropdownToggle>
                            <DropdownMenu style={{ backgroundColor: '#000000' }} dark expand="md" end>
                                <DropdownItem href='/Viaje_Tarija' className="dropdown-item-hover">
                                    Tarija
                                </DropdownItem>
                                <DropdownItem href='/Viaje_Cochabamba' className="dropdown-item-hover">
                                    Cochabamba
                                </DropdownItem>
                                <DropdownItem href='/Viaje_Potosí' className="dropdown-item-hover">
                                    Potosí
                                </DropdownItem>
                                <DropdownItem href='/Viaje_Camargo' className="dropdown-item-hover">
                                    Camargo
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Cielito Lindo
                            </DropdownToggle>
                            <DropdownMenu style={{ backgroundColor: '#000000' }} dark expand="md" end>
                                <DropdownItem href='/gestion_unidades' className="dropdown-item-hover">
                                    Gestionar Unidades
                                </DropdownItem>
                                <DropdownItem href='/gestion_viajes' className="dropdown-item-hover">
                                    Gestionar Viajes
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem href='/' className="dropdown-item-hover">
                                    Cerrar sesión
                                </DropdownItem>
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
