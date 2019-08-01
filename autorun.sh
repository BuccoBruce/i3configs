#!/bin/bash
sudo pacman -Syy
sudo pacman -S pacman-mirrors
sudo pacman-mirrors --fasttrack && sudo pacman -Syyu
sudo pacman -Syu pamac
