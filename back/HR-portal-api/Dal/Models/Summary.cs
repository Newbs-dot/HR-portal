﻿using Dal.Models.Interfaces;

namespace Dal.Models;

public class Summary : IBaseModel
{
    public long Id { get; set; }

    public string Experience { get; set; }

    public int Salary { get; set; }

    public string Description { get; set; }

    public string? File { get; set; }

    public bool IsActive { get; set; }

    public long CreatedBy { get; set; }
}