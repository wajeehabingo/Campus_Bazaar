using System;
using System.Collections.Generic;
using CampusBazaar.DSA.Models;
using CampusBazaar.DSA.DataStructures;
using CampusBazaar.DSA.Algorithms;

namespace CampusBazaar.DSA
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("--- Campus Bazaar DSA Module: Day 4 & Day 5 Verification ---\n");

            ResourceRepository repo = new ResourceRepository();
            Trie titleTrie = new Trie();

            ResourceItem note1 = new ResourceItem(101, "Data Structures Final Notes", "Comprehensive summary of trees and graphs.", "CS-201", "PDF", "Ali Khan")
            {
                DownloadCount = 15
            };
            ResourceItem note2 = new ResourceItem(102, "Database Systems Lab Manual", "SQL queries and normalization tasks.", "CS-302", "PDF", "Amna Haseeb")
            {
                DownloadCount = 42
            };
            ResourceItem note3 = new ResourceItem(103, "Calculus Formula Sheet", "Derivatives, integrals, and formulas.", "MTH-101", "TXT", "Sara Ahmed")
            {
                DownloadCount = 8
            };

            ResourceItem[] initialResources = { note1, note2, note3 };

            foreach (var item in initialResources)
            {
                repo.AddResource(item);
                titleTrie.IndexTitle(item.Title, item.Id);
            }

            // --- Day 4: Prefix Search ---
            string[] testPrefixes = { "dat", "man", "cal", "xyz" };

            foreach (string prefix in testPrefixes)
            {
                Console.WriteLine($"\nPrefix search for '{prefix}':");
                List<int> matchedIds = titleTrie.SearchPrefix(prefix);

                if (matchedIds.Count == 0)
                {
                    Console.WriteLine("  No matching resources found.");
                    continue;
                }

                foreach (int id in matchedIds)
                {
                    ResourceItem item = repo.GetResourceById(id);
                    if (item != null)
                    {
                        Console.WriteLine($"  -> {item}");
                    }
                }
            }

            // --- Day 5: Sorting & Filtering ---
            Console.WriteLine("\n--- Day 5: Sorted by Downloads (High to Low) ---");
            var sortedByDownloads = ResourceSorter.SortByDownloadsDescending(initialResources);
            foreach (var item in sortedByDownloads)
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\n--- Day 5: Sorted by Title (A to Z) ---");
            var sortedByTitle = ResourceSorter.SortByTitleAscending(initialResources);
            foreach (var item in sortedByTitle)
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\n--- Day 5: Filtered by FileType 'PDF' ---");
            var pdfResources = ResourceSorter.FilterByFileType(initialResources, "PDF");
            foreach (var item in pdfResources)
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\n--- Day 5: Filtered by CourseCode 'CS-302' ---");
            var cs302Resources = ResourceSorter.FilterByCourseCode(initialResources, "CS-302");
            foreach (var item in cs302Resources)
            {
                Console.WriteLine($"  -> {item}");
            }

            Console.WriteLine("\nDay 5 sorting and filtering complete! Press any key to exit.");
            Console.ReadKey();
        }
    }
}